"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useRouter } from "next/navigation";

interface CalendarEvent extends EventInput {
  extendedProps: {
    tipo: "fabricacao" | "entrega" | "coincidente";
    cliente: string;
  };
}

const Calendar: React.FC = () => {
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "João da Silva",
        start: "2026-01-10",
        allDay: true,
        extendedProps: { tipo: "entrega", cliente: "João da Silva" },
      },
      {
        id: "2",
        title: "Oficina Kairós",
        start: "2026-01-07",
        allDay: true,
        extendedProps: { tipo: "fabricacao", cliente: "Oficina Kairós" },
      },
      {
        id: "3",
        title: "Pedido Exemplo",
        start: "2026-01-15",
        allDay: true,
        extendedProps: { tipo: "coincidente", cliente: "Pedido Exemplo" },
      }
    ]);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const dataSelecionada = selectInfo.startStr;
    router.push(`/pedidos/cadastro?data=${dataSelecionada}`);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const pedidoId = clickInfo.event.id;
    router.push(`/pedidos/visualizar/${pedidoId}`);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const tipo = eventInfo.event.extendedProps.tipo;
    
    let estiloClasses = "";
    if (tipo === "entrega") {
      estiloClasses = "bg-[#fb6514] text-white border-[#fb6514]";
    } else if (tipo === "fabricacao") {
      estiloClasses = "bg-white text-[#fb6514] border-2 border-[#fb6514]";
    } else if (tipo === "coincidente") {
      estiloClasses = "bg-red-600 text-white border-red-600";
    }

    return (
      <div className={`flex w-full flex-col px-1.5 py-0.5 rounded-sm shadow-sm overflow-hidden hover:brightness-95 transition-all ${estiloClasses}`}>
        <div className="text-[10px] font-bold truncate leading-tight pointer-events-none">
          {tipo === "fabricacao" ? "🔨 " : tipo === "entrega" ? "🚚 " : "⚠️ "}
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <style jsx global>{`
        .fc { --fc-border-color: #e5e7eb; font-family: inherit; }
        .dark .fc { --fc-border-color: #1f2937; }
        .fc .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 700; color: #111827; }
        .dark .fc .fc-toolbar-title { color: white; }
        .fc .fc-button-primary { background-color: white; border-color: #e5e7eb; color: #374151; font-weight: 500; text-transform: capitalize; }
        .fc .fc-button-primary:hover { background-color: #f9fafb; border-color: #d1d5db; color: #111827; }
        .fc .fc-button-active { background-color: #fb6514 !important; border-color: #fb6514 !important; color: white !important; }
        
        /* ADICIONADO: Cursor pointer nos eventos e dias selecionáveis */
        .fc-event { cursor: pointer !important; }
        .fc-daygrid-day { cursor: pointer; }
        
        .fc-daygrid-event { background: none !important; border: none !important; padding: 0 !important; }
        .fc-daygrid-day-top { flex-direction: row !important; padding: 4px !important; }
      `}</style>
      
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ptBrLocale}
          headerToolbar={{
            left: "prev,next addPedido",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addPedido: {
              text: "Criar Pedido +",
              click: () => router.push("/pedidos/cadastro"),
            },
          }}
          height="auto"
          dayMaxEvents={3}
          stickyHeaderDates={true}
        />
      </div>
    </div>
  );
};

export default Calendar;