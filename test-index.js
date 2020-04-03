import * as QualUtils from './index'

async function main () {
    const configuration = await QualUtils.startExperiment()
    QualUtils.sendData({ time: new Date().valueOf(), configuration: configuration })
}

main()
