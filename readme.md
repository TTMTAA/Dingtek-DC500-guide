# Dingtek DC500 LoRaWAN PIR person tæller

## Opret i OS2IoT
Opret i os2iot som en almindelig LoRaWAN device. Vælg LoRaWAN version 1.0.4.

DevEUI står på label på device

Alle DC500 devices har samme AppKey. Den er `2b7e151628aed2a6abf7158809cf4f3c`
Ja det er dumt og ikke specielt sikkert, men sådan valgte Dingtek altså det skulle være.

## Konfiguration

Default konfigurationen af DC500 er ikke helt optimal. 
Der er 4 indstillinger der med fordel kan skiftes. 
Dette gøres lettest Over-The-Air, altså med downlink beskeder.

Der er 4 af disse beskeder, de skal alle sendes til port `3`

Man kan fint lægge alle 4 i kø samtidig, så sender os2iot dem hen ad vejen.

### Sæt tansmissions interval til 1 time
```
80029999010181
```
### Sæt intern tæller til max, gør at device kun sender en gang i timen
```
8002999902FFFF81
```

### Sluk BLE interface
```
80029999091181
```

### Sæt trigger delay til 6 sekunder, reducerer dobbelt triggers
```
800299990B0681
```

## Restart
Efter device er oprettet og de 4 downlink beskeder er lagt i kø kan device tændes, 
dette gøres ved at tilslutte batteriet inde i device. 
Man kan også reboote device ved at berøre det med en stærk magnet, 
men det er ikke altid lige let at finde det rigtige punkt.


## Payload decoder
Der ligger en os2iot payload decoder i filen [os2iot-payload-dcoder.js](os2iot-payload-dcoder.js)
