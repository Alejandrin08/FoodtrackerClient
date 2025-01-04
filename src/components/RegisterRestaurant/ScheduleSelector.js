import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styles from "./RegisterRestaurant.module.css";

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');

export default function ScheduleSelector({ schedule, onScheduleChange }) {
  const [localSchedule, setLocalSchedule] = useState(schedule);

  const handleDayToggle = (day) => {
    setLocalSchedule((prev) => {
      const newSchedule = { ...prev };
      if (newSchedule[day]) {
        delete newSchedule[day];
      } else {
        newSchedule[day] = { open: '09:00', close: '17:00' };
      }
      updateFormattedSchedule(newSchedule);
      return newSchedule;
    });
  };

  const handleHourChange = (day, type, value) => {
    setLocalSchedule((prev) => {
      const newSchedule = {
        ...prev,
        [day]: { ...prev[day], [type]: value },
      };
      updateFormattedSchedule(newSchedule);
      return newSchedule;
    });
  };

  const updateFormattedSchedule = (newSchedule) => {
    const formattedSchedule = {};
    Object.keys(newSchedule).forEach((day) => {
      if (newSchedule[day]?.open && newSchedule[day]?.close) {
        formattedSchedule[day] = `${newSchedule[day].open}-${newSchedule[day].close}`;
      }
    });

    onScheduleChange(formattedSchedule);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Horario</Form.Label>
      {days.map((day) => (
        <Row key={day} className="mb-2 align-items-center">
          <Col xs={4} md={3}>
            <Form.Check
              type="switch"
              id={`day-${day}`}
              label={day}
              checked={!!localSchedule[day]}
              onChange={() => handleDayToggle(day)}
              custom
              className={styles.swithSchedule}
            />
          </Col>
          {localSchedule[day] && (
            <>
              <Col xs={4} md={3}>
                <Form.Select
                  value={localSchedule[day]?.open}
                  onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={1} className="text-center">A</Col>
              <Col xs={4} md={3}>
                <Form.Select
                  value={localSchedule[day]?.close}
                  onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </Form.Select>
              </Col>
            </>
          )}
        </Row>
      ))}
    </Form.Group>
  );
}