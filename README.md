# Denga
:warning: you can install the project but many features still under development :construction:

A modern [Agenda](https://github.com/agenda/agenda) Dashboard made with :balloon: Angular :tada:

# Install

```console
$ npm install denga
```

# Usage

```console
$ denga --db mongodb://127.0.0.1:27017/denga 
```

# Options


`--db, -d`: (required) connection URI used to connect to a MongoDB

`--port, -p`: (optional) server port, default 3000


`--collection, -c`:	(optional) Mongo collection, same as Agenda collection name, default agendaJobs


`--limit, -l`:	(optional) max number of jobs displayed, default 100


`--title, -t`:	(optional) page title, default Denga


# Example
```console
$ denga -p 3010 -c jobs -t myDashBoard --limit=300 -d mongodb://127.0.0.1:27017/denga
```

# Scripts
In your dev environment, you can kick off the project (server and client) under nodemon with 

```console
npm run monitor
```

you can launch an unmonitored process with 
```console
npm run all
```

to run build on both server and client-side
```console
npm run build 
```

# Project Structure

* client (Angular)
* server (Node.js)

# Requirement
* The Angular CLI requires a minimum Node.js version of either v10.13 or v12.0.



# Features

* Monitor jobs
* Auto refresh with "toggle switch" (on/off) 
* WIP :fire:


# TODO

- [x] Setup config system (config file and/or command line arguments )
- [x] Display 100 jobs in home page
- [x] Manage refresh
- [x] Manage refresh "toggle switch" (on/off button) 
- [ ] Display job details
- [ ] Requeue and delete jobs 
- [ ] Make jobs filtrable by name
- [ ] Make jobs filtrable by custom properties (~ get an array from config file)
- [ ] Manage pagination ?!
- [ ] Make it run as NodeJS command-line package :sunglasses:
- [ ] Ship 1st release :pray: :rocket:


# Story
I'm a fan of Agenda :star: , and I'm using it in several projects for a very long time. And I've always used, Agendash as the dashboard, But I must say, it wasn't created to cover all the various situations (I've spent too many hours writing MongoDB queries). 

So making Denga is a way to save some time.

## License
GNU General Public License v3.0