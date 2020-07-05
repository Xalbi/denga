import { JobsDB } from '../databases/mongodb';

export class StatsOverviewLib {

    async getAll() {
        try {
            let res = await JobsDB().aggregate([
                {
                    $project: {
                        _id: 0,
                        name: '$name',
                        type: '$type',
                        priority: '$priority',
                        repeatInterval: '$repeatInterval',
                        repeatTimezone: '$repeatTimezone',
                        nextRunAt: { $ifNull: ['$nextRunAt', 0] },
                        lockedAt: { $ifNull: ['$lockedAt', 0] },
                        lastRunAt: { $ifNull: ['$lastRunAt', 0] },
                        lastFinishedAt: { $ifNull: ['$lastFinishedAt', 0] },
                        failedAt: { $ifNull: ['$failedAt', 0] }
                    }
                },
                {
                    $project: {
                        name: '$name',
                        type: '$type',
                        priority: '$priority',
                        repeatInterval: '$repeatInterval',
                        repeatTimezone: '$repeatTimezone',
                        running: {
                            $cond: [{
                                $and: [
                                    '$lastRunAt',
                                    { $gt: ['$lastRunAt', '$lastFinishedAt'] }
                                ]
                            }, 1, 0]
                        },
                        scheduled: {
                            $cond: [{
                                $and: [
                                    '$nextRunAt',
                                    { $gte: ['$nextRunAt', new Date()] }
                                ]
                            }, 1, 0]
                        },
                        queued: {
                            $cond: [{
                                $and: [
                                    '$nextRunAt',
                                    { $gte: [new Date(), '$nextRunAt'] },
                                    { $gte: ['$nextRunAt', '$lastFinishedAt'] }
                                ]
                            }, 1, 0]
                        },
                        completed: {
                            $cond: [{
                                $and: [
                                    '$lastFinishedAt',
                                    { $gt: ['$lastFinishedAt', '$failedAt'] }
                                ]
                            }, 1, 0]
                        },
                        failed: {
                            $cond: [{
                                $and: [
                                    '$lastFinishedAt',
                                    '$failedAt',
                                    { $eq: ['$lastFinishedAt', '$failedAt'] }
                                ]
                            }, 1, 0]
                        },
                        repeating: {
                            $cond: [{
                                $and: [
                                    '$repeatInterval',
                                    { $ne: ['$repeatInterval', null] }
                                ]
                            }, 1, 0]
                        }
                    }
                },
                {
                    $group: {
                        _id: '$name',
                        displayName: { $first: '$name'},
                        total: { $sum: 1 },
                        running: { $sum: '$running' },
                        scheduled: { $sum: '$scheduled' },
                        queued: { $sum: '$queued' },
                        completed: { $sum: '$completed' },
                        failed: { $sum: '$failed' },
                        repeating: { $sum: '$repeating' }
                    }
                },
                {
                    $group: { 
                        _id: null, 
                        jobTypes: {
                            "$push": {
                                jobName: "$_id",
                                data: [
                                    {"state": {$literal : "total"}, "number":  "$total"},
                                    {"state": {$literal : "running"}, "number":  "$running"},
                                    {"state": {$literal : "scheduled"}, "number":  "$scheduled"},
                                    {"state": {$literal : "queued"}, "number":  "$queued"},
                                    {"state": {$literal : "completed"}, "number":  "$completed"},
                                    {"state": {$literal : "failed"}, "number":  "$failed"},
                                    {"state": {$literal : "repeating"}, "number":  "$repeating"}
                                ]
                            }
                        },
                        total: { $sum: '$total' }  ,
                        running: { $sum: '$running' },
                        scheduled: { $sum: '$scheduled' },
                        queued: { $sum: '$queued' },
                        completed: { $sum: '$completed' },
                        failed: { $sum: '$failed' },
                        repeating: { $sum: '$repeating' }
                    }
                },
                {
                    $project : {
                        _id: 0, 
                        jobTypes: 1, 
                        totalJobs: {
                            jobName: {$literal : "Total"},
                            data : [
                                {"state": {$literal : "total"}, "number":  "$total"},
                                {"state": {$literal : "running"}, "number":  "$running"},
                                {"state": {$literal : "scheduled"}, "number":  "$scheduled"},
                                {"state": {$literal : "queued"}, "number":  "$queued"},
                                {"state": {$literal : "completed"}, "number":  "$completed"},
                                {"state": {$literal : "failed"}, "number":  "$failed"},
                                {"state": {$literal : "repeating"}, "number":  "$repeating"}
                            ]
                        }
                    }      
                }
        ]).toArray();
            return res[0]
        } catch (error) {
            throw error;
        }
    }

}
