import React, { useMemo, useState } from "react";
import * as moment from "moment";
import "./calendar.css"

const Calendar =()=>{

    const [currentData,setCurrentDate]=useState(moment());

    const daysOfWeek = moment.weekdaysShort()

    const handlePreviusYear=()=>{
        const currentYear = currentData.year();
        let dateObject = Object.assign({}, currentData);
        let newYear = currentYear -1;
        dateObject = moment(dateObject).set("year",newYear);
        setCurrentDate(dateObject)
    }

    const handleNextMonth=()=>{
        const currentYear = currentData.year();
        let dateObject = Object.assign({}, currentData);
        let newYear = currentYear +1;
        dateObject = moment(dateObject).set("year",newYear);
        setCurrentDate(dateObject)
    }

    const handleMonthChange =(event)=>{
        let dateObject = Object.assign({}, currentData);
        dateObject = moment(dateObject).set("month", event.target.value);
        setCurrentDate(dateObject)
    }

    const getRows =(cd)=>{
        const todayDate = moment()
        const isSameMonth = todayDate.isSame(cd,"month");
        let firstDay = cd.startOf("month").format("d"); 
        let startWeek = 0;
        const cells = []
        const totalDaysInMonth = cd.daysInMonth();
        const rows=[];

        if(firstDay){
            for(let i=0; i<firstDay; i++){
                cells.push(<td className="empty-cell cell"></td>)
            }
        }

        for(let i=1; i<=totalDaysInMonth; i++){
            if(todayDate.get('D') === i && isSameMonth){
                cells.push(<td className={"day-cell cell" + " is-current-date"}>{i}</td>)
            }else{
                cells.push(<td className="day-cell cell">{i}</td>)
            }
        }

        cells.forEach((cell,index)=>{
            if(index%7===0){
                rows.push(<tr>{cells.slice(startWeek,index+7)}</tr>)
                startWeek=index+7
            }
        });

        return rows;
    }

    const calendarRows = useMemo(()=>{
        return getRows(currentData)
    },[currentData])

    return(
        <div>
            <table>
                    <tr  className="year-controller">
                        <td><button onClick={handlePreviusYear}>&lt;</button></td>
                        <td><span>{currentData.year()}</span></td>
                        <td><button onClick={handleNextMonth}> &gt; </button></td>
                    </tr>
                    <tr className="month-controller">
                        <td colSpan={3}>
                            <select value={currentData.month()} onChange={handleMonthChange}>
                                <option value="0">Janary</option>
                                <option value="1">Feb</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <table>
                                <thead>
                                    <tr>
                                        {daysOfWeek.map(day=>( <th className="day-name" key={day}>{day}</th> ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {calendarRows}
                                </tbody>
                            </table>
                        </td>
                    </tr>
            </table>           
        </div>
    )
}
export default Calendar;