
import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Calendar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      title: 'Team Standup',
      time: '09:00 AM',
      date: '2024-01-28',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '02:00 PM',
      date: '2024-01-28',
      type: 'review'
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '10:00 AM',
      date: '2024-01-29',
      type: 'presentation'
    },
    {
      id: 4,
      title: 'Design Workshop',
      time: '03:00 PM',
      date: '2024-01-30',
      type: 'workshop'
    }
  ];

  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h2>
                <p className="text-gray-600">Manage your schedule and events</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      January 2024
                    </span>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayEvents.length > 0 ? (
                    todayEvents.map(event => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No events today</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.type === 'meeting' ? 'bg-blue-500' :
                        event.type === 'review' ? 'bg-green-500' :
                        event.type === 'presentation' ? 'bg-red-500' : 'bg-purple-500'
                      }`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.time} - {event.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
