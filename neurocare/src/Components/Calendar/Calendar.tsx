import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const JournalCalendar: React.FC = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className=''>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default JournalCalendar;