import React, { useEffect } from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { trackFeatureUsage } from '../../../utils/FeatureInteraction.js'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const JournalCalendar: React.FC = () => {
    useEffect( ()=> {
        trackFeatureUsage('Calendar')
    },[]);
    
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className=''>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default JournalCalendar;