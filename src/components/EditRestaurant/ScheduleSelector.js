import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styles from "./EditRestaurant.module.css";

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');

const ScheduleSelector = ({ schedule, onScheduleChange }) => {
  const [localSchedule, setLocalSchedule] = useState({});

  const handleDayToggle = (day) => {
    setLocalSchedule((prev) => {
      const newSchedule = { ...prev };

      if (newSchedule[day]) {
        delete newSchedule[day];
      } else {
        newSchedule[day] = { open: '09:00', close: '17:00' };
      }

      onScheduleChange(
        Object.keys(newSchedule).reduce((acc, key) => {
          if (newSchedule[key]) {
            acc[key] = `${newSchedule[key].open}-${newSchedule[key].close}`;
          }
          return acc;
        }, {})
      );

      return newSchedule;
    });
  };

  useEffect(() => {
    const transformedSchedule = days.reduce((acc, day) => {
      if (typeof schedule[day] === 'string' && schedule[day].includes('-')) {
        const [open, close] = schedule[day].split('-');
        acc[day] = { open, close };
      } else {
        acc[day] = null;
      }
      return acc;
    }, {});

    setLocalSchedule((prev) => ({ ...prev, ...transformedSchedule }));
  }, [schedule]);

  const handleHourChange = (day, type, value) => {
    setLocalSchedule((prev) => {
      const updatedDaySchedule = { ...prev[day], [type]: value };

      const newSchedule = { ...prev, [day]: updatedDaySchedule };

      onScheduleChange(
        Object.keys(newSchedule).reduce((acc, key) => {
          if (newSchedule[key]) {
            acc[key] = `${newSchedule[key].open}-${newSchedule[key].close}`;
          }
          return acc;
        }, {})
      );

      return newSchedule;
    });
  };

  return (
    <div className={styles.scheduleSelector}>
      {days.map((day) => (
        <Row key={day} className="mb-2">
          <Col xs={4}>
            <Form.Check
              type="switch"
              id={`switch-${day}`}
              label={day}
              checked={!!localSchedule[day]} // Depende solo de localSchedule
              onChange={() => handleDayToggle(day)}
            />
          </Col>
          {localSchedule[day] && (
            <>
              <Col xs={4}>
                <Form.Control
                  as="select"
                  value={localSchedule[day]?.open || '09:00'}
                  onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col xs={4}>
                <Form.Control
                  as="select"
                  value={localSchedule[day]?.close || '17:00'}
                  onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </>
          )}
        </Row>
      ))}
    </div>
  );
};

export default ScheduleSelector;
