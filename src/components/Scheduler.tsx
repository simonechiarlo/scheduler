import { useState } from "react"
import Style from "./Scheduler.module.css"
import { Subject, Teacher } from "../Interfaces"

type HEXColorString  = string
type RGBColorString  = string | [ number, number, number ]
type RGBAColorString = string | [ number, number, number, number ]

type HourData = {
    day      : number
    fromHour : number
    toHour   : number
    teachers : Teacher[]
    subject  : Subject
}

type TimeSettings = {
    hourLenght : string
    fromHour   : string
    toHour     : string
}

type CellProps = {
    text_color      : RGBColorString | RGBAColorString | HEXColorString
    primary_color   : RGBColorString | RGBAColorString | HEXColorString
    secondary_color : RGBColorString | RGBAColorString | HEXColorString
}

type Props = {
    height ?: number | string
    width  ?: number | string
    data    : Array<HourData>
    dayTabHeight    : number | string
    hourTabWidth    : number | string
    accent_color    : RGBColorString | RGBAColorString | HEXColorString
    primary_color   : RGBColorString | RGBAColorString | HEXColorString
    secondary_color : RGBColorString | RGBAColorString | HEXColorString
    
    cellProps    : CellProps

    timeSettings : TimeSettings
}

const FALLBACK_UNIT_TYPE = "px",
      EVER               = true,
      HOUR_FORMATTER     = Intl.NumberFormat(undefined, {minimumIntegerDigits : 2})

const TODAY        = new Date(),
      CURRENT_WEEK = new Date()

CURRENT_WEEK.setHours(0)
CURRENT_WEEK.setMilliseconds(0)
CURRENT_WEEK.setSeconds(0)
CURRENT_WEEK.setMinutes(0)
CURRENT_WEEK.setDate(
    CURRENT_WEEK.getDate() - CURRENT_WEEK.getDay()
)

const extractColor : ( color : RGBColorString | RGBAColorString | HEXColorString ) => string = color => 
    ( typeof color === "string" ) 
        ? color 
        : color.length === 3 
            ? `rgb(${color.join(", ")})` 
            : `rgba(${color.join(", ")})`

const extractMaybeProp : ( prop : undefined | number | string ) => string = prop =>
    ( prop === undefined ) 
        ? "100%"
        : ( typeof prop === "string" )
            ? prop
            : `${prop}${FALLBACK_UNIT_TYPE}`

const DayView = ({ currentWeek, height, width } : { currentWeek : Date, height : string, width : string } ) => {
    let temp_data = new Date(currentWeek)
    temp_data.setDate(temp_data.getDate() + 1)
    const getDataAndIncrement = () => {
        let ret = temp_data.getDate();
        temp_data.setDate(temp_data.getDate() + 1)
        return ret
    }
    return (
    <div className={Style.schedulerDayContainer} style={{width}}>
        <div className={Style.schedulerDay}>
            <div>
                <span>{getDataAndIncrement()}/{temp_data.getMonth() + 1}</span>
            </div>
            <p>Lunedì</p>
        </div>
        <div className={Style.schedulerDay}>
            <div>
                <span>{getDataAndIncrement()}/{temp_data.getMonth() + 1}</span>
            </div>
            <p>Martedì</p>
        </div>
        <div className={Style.schedulerDay}>
            <div>
                <span>{getDataAndIncrement()}/{temp_data.getMonth() + 1}</span>
            </div>
            <p>Mercoledì</p>
        </div>
        <div className={Style.schedulerDay}>
            <div>
                <span>{getDataAndIncrement()}/{temp_data.getMonth() + 1}</span>
            </div>
            <p>Giovedì</p>
        </div>
        <div className={Style.schedulerDay}>
            <div>
                <span>{getDataAndIncrement()}/{temp_data.getMonth() + 1}</span>
            </div>
            <p>Venerdì</p>
        </div>
    </div>
)}

const getIntegerFromTime = ( time : string ) => 
    time.split(":")
        .reduce((acc, val, index) => acc + Number(val) * ( 60 ** ( 1 - index ) ), 0)

const getTimeFromInteger = ( integer : number ) =>
    `${ ~~( integer / 60 ) }:${ HOUR_FORMATTER.format( integer % 60 ) }`

const HourDisplay = ({ timeSettings, hourTabWidth, numberOfModules } : { timeSettings : TimeSettings, hourTabWidth : number | string, numberOfModules : number }) => {

    function* moduleGenerator() {
        const IncrementValue = getIntegerFromTime(timeSettings.hourLenght),
              StartValue     = getIntegerFromTime(timeSettings.fromHour)
        let i = 0
        for(;EVER;) yield getTimeFromInteger( StartValue + (IncrementValue * ++i) )
    }

    let getHour = moduleGenerator()
    let modules = new Array<string>()
    for(let i = 0; i < numberOfModules - 1; i++) modules.push(getHour.next().value as string)
    return (
        <div className={Style.hourDisplayContainer} style={{ width : hourTabWidth }}>
            {modules.map( mod => ( 
            <div key={mod} className={Style.hourDisplay}>
                <p className={Style.hourLabel}>{mod}</p>
            </div> 
            ))}
        </div>
    )
}

const HourGridDisplay = ({ data, cellProps, numberOfModules, width } : { data : HourData[], cellProps : CellProps, numberOfModules : number, width : string }) => {
    
    let actual_data = new Array<HourData>()
    data.forEach( el => { 
        for( let elem of actual_data ) {
            if (   elem.day      == el.day 
                && elem.fromHour == el.fromHour
                && elem.toHour   == el.toHour
                && elem.subject  == el.subject
            ) elem.teachers.push( ...el.teachers )
            else actual_data.push( el )
        }
    })

    const getItemForCell = (index : number) => {
        const DAY  = index % 5,
              HOUR = ~~ ( index / 5 ),
              DATA = actual_data.find( hour => hour.day === DAY && hour.fromHour === HOUR )
        return DATA === undefined ? (
            <div className={Style.emptyCell} />
        ) : (
            <div className={Style.HourGridCellData}>
                <p>{ DATA.subject.Name }</p>
            </div>
        )
    }

    return (
        <div className={Style.HourGridContainer} style={{width}}>
            {new Array( numberOfModules * 5 ).fill(undefined).map( ( el, index ) => (
                <div className={Style.HourGridCell} key={index}>
                    {getItemForCell(index)}
                </div>
            ))}
        </div>
    )
}

export default ({height, width, hourTabWidth, dayTabHeight, data, accent_color, primary_color, secondary_color, cellProps, timeSettings} : Props) => {

    const [week, setWeek] = useState(CURRENT_WEEK),
          actualH      = extractMaybeProp( height ),
          actualW      = extractMaybeProp( width  ),
          actualAccCol = extractColor( accent_color    ),
          actualPriCol = extractColor( primary_color   ),
          actualSecCol = extractColor( secondary_color ),
          NUMBER_OF_MODULES = ( getIntegerFromTime(timeSettings.toHour)
                            - getIntegerFromTime(timeSettings.fromHour) )
                            / getIntegerFromTime(timeSettings.hourLenght)
    
    return (
    <div 
        className={Style.schedulerWrap}
        style={{
            height : actualH,
            width  : actualW,
            backgroundColor : actualPriCol
        }}
    >
        <div className={Style.topWrap}>
            <div className={Style.empty} style={{width:hourTabWidth, height:"100%"}}/>
            <DayView currentWeek={week} height={ typeof dayTabHeight === "number" ? `${dayTabHeight}px` : dayTabHeight } width={`calc(100% - ${hourTabWidth})`}/>
        </div>
        <div className={Style.bottomWrap}>
            <HourDisplay hourTabWidth={hourTabWidth} timeSettings={timeSettings} numberOfModules={NUMBER_OF_MODULES}/>
            <HourGridDisplay data={data} cellProps={cellProps} numberOfModules={NUMBER_OF_MODULES} width={`calc(100% - ${hourTabWidth})`}/>
        </div>
    </div>
    )
}