const launchesDatabase = require('./launches.mongoose')

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber:100,
    mission:'kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate:new Date('December 27,2030'),
    target:'Kepler-442 B',
    customer:['Gary','Simon'],
    upcoming: true,
    success: true,
};

// launches.set(launch.flightNumber,launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

async function saveLaunch(launch){
    await launchesDatabase.updateOne({
        flightNumber:launch.flightNumber,},
        launch,{
            upsert:true,
        })
}

async function getAllLaunches(){
    return await launchesDatabase.find({},{'_id':0,'_v':0});
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        flightNumber:latestFlightNumber,
        success:true,
        upcoming:true,
        customer:['Gary','NASA'],
    }));
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
   getAllLaunches,
   addNewLaunch,
   existsLaunchWithId,
   abortLaunchById,
};