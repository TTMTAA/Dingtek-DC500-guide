function DC500(payload) { 
    data = Buffer.from(payload.data, 'base64');

    if (data[0] != 0x80) return {error: "bad header [0]"};
    if (data[1] != 0x00) return {error: "bad header [1]"};
    if (data[2] != 0x15) return {error: "unsupported device type"};
    if (data[data.length -1] !== 0x81) return {error: "bad tail"};
    switch (data[3]){
        case 0x01:
        case 0x02:
        case 0x04:
          return {
              peopleCounted: data.readUInt16BE(5),
              status: data[7],
              batteryVoltage: data.readUInt16BE(9) /100,
              frameCounter: data.readUInt16BE(17)
          };
        
        case 0x03:
            return {
                firmwareVersion: `${data[5]}.${data[6]}`,
                heartbeatInterval: data[7],
                peopleCountAlarmThreshold: data.readUInt16BE(8),
                batteryAlarmThreshold: data[10]
            }    
        
        default:
            return {error: "unknown report type"};
    }
}


function decode(payload, metadata) {
    // removing appkey before sending to data target - mogul-2025-08-23
    delete metadata.lorawanSettings.OTAAapplicationKey;
    delete metadata.OTAAapplicationKey;
    
    return {
        payload:  payload,
        metadata: metadata,
        timestamp: new Date(),
        decoded: DC500(payload)
    };
}
