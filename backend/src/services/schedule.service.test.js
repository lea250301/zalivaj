import { describe, expect, it } from 'vitest';
import { generateSchedule } from './schedule.service.js';

const date = (value) => new Date(`${value}T00:00:00.000Z`);
const dates = (tasks) => tasks.map((task) => task.dueDate.toISOString().slice(0, 10));

describe('generateSchedule', () => {
  it('vrne prazen urnik, če ni rastlin', () => {
    expect(generateSchedule(date('2026-11-01'), date('2026-11-10'), [])).toEqual([]);
  });

  it('ustvari opravilo na začetni dan', () => {
    const tasks = generateSchedule(date('2026-11-01'), date('2026-11-01'), [
      { id: 'plant-1', wateringEveryDays: 2 },
    ]);

    expect(dates(tasks)).toEqual(['2026-11-01']);
  });

  it('ponavlja opravila po pogostosti zalivanja', () => {
    const tasks = generateSchedule(date('2026-11-01'), date('2026-11-10'), [
      { id: 'plant-1', wateringEveryDays: 2 },
    ]);

    expect(dates(tasks)).toEqual([
      '2026-11-01',
      '2026-11-03',
      '2026-11-05',
      '2026-11-07',
      '2026-11-09',
    ]);
  });

  it('ne ustvari opravila po končnem datumu', () => {
    const tasks = generateSchedule(date('2026-11-01'), date('2026-11-04'), [
      { id: 'plant-1', wateringEveryDays: 2 },
    ]);

    expect(dates(tasks)).toEqual(['2026-11-01', '2026-11-03']);
  });

  it('združi opravila več rastlin in jih razvrsti po datumu', () => {
    const tasks = generateSchedule(date('2026-11-01'), date('2026-11-03'), [
      { id: 'plant-1', wateringEveryDays: 2 },
      { id: 'plant-2', wateringEveryDays: 1 },
    ]);

    expect(dates(tasks)).toEqual([
      '2026-11-01',
      '2026-11-01',
      '2026-11-02',
      '2026-11-03',
      '2026-11-03',
    ]);
  });
});