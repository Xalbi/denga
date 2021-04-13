import { JobsDB } from '../databases/mongodb';
import { ObjectId } from 'mongodb';
import { Filter } from '../models/filter';
const agenda = require('./agenda.lib');

const Config = require('conf');
const settings = new Config({
	configName: process.env.NODEJS_DENGA_CONFIGNAME
});

export class JobsLib {

	async getAll(filter: Filter) {
		let dbFilter: any = this.prepareFilter(filter);
		try {
			let res = await JobsDB().find(dbFilter).limit(settings.get('limit')).sort({
				  nextRunAt: -1,
				  lastRunAt: -1,
				  lastFinishedAt: -1,
			}).toArray()
			
			res = res.map(c => {
				c._id = c._id.toString()
				return c
			})
			return res
		} catch (error) {
			throw error;
		}
	}

	async remove(param) {
		let idsList = param.ids.map(i => new ObjectId(i))
		try {
			let res = await JobsDB().deleteMany({
				_id: { $in: idsList }
			});
			return res
		} catch (error) {
			throw error;
		}
	}
	
	async removeByFilter(filter: Filter) {
		let dbFilter: any = this.prepareFilter(filter);
		try {
			let res = await JobsDB().deleteMany(dbFilter);
			return res
		} catch (error) {
			throw error;
		}
	}

	prepareFilter(filter: Filter) {
		let dbFilter: any = {};

		if (filter.job_names.length || filter.search_string) {
			dbFilter = { $and: [] }

			if (filter.job_names.length) {
				dbFilter.$and.push({
					name:
					{
						$in: filter.job_names,
					}
				})
			}
			if (filter.search_string) {
				let dbKeysFilter: any = {};
				let keys = settings.get('keys')
				let preparedKeys = keys.map(k => 'data.' + k.trim())
				dbKeysFilter = { $or: [] }
				if (preparedKeys.length) {
					for (const k of preparedKeys) {
						let cond = {}
						cond[k] = {
							$regex: filter.search_string,
							$options: 'i'
						}
						dbKeysFilter.$or.push(cond)
					}
					dbFilter.$and.push(dbKeysFilter)
				}
			}

			if (!dbFilter.$and.length) {
				dbFilter = {}
			}
		}

		return dbFilter
	}

	async requeue(param) {
		let idsList = param.ids.map(i => new ObjectId(i))
		let jobs = await JobsDB().find({
			_id: { $in: idsList }
		}).toArray();

		for (const job of jobs) {
			agenda.now(job.name, job.data)
		}
		return {}
	}

}
