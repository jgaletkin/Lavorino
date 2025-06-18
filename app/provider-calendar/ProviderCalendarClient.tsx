'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function eventStyleGetter(event: any) {
  let backgroundColor = '#10B981';
  if (event.type === 'suggested') backgroundColor = '#F59E0B';
  return {
    style: {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    },
  };
}

export default function ProviderCalendarClient({ events }: { events: any[] }) {
  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="week"
        popup
        selectable
      />
    </div>
  );
} 