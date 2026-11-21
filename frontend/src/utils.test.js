import { describe, expect, it } from 'vitest';
import { formatDate, formatRange, plural, trustLabel } from './utils.js';

describe('frontend utils', () => {
  it('formatira datum', () => {
    expect(formatDate('2026-11-01')).toBe('1. 11. 2026');
  });

  it('za prazen datum vrne prazen niz', () => {
    expect(formatDate('')).toBe('');
  });

  it('formatira datumski razpon', () => {
    expect(formatRange('2026-11-01', '2026-11-10')).toBe('1. 11. 2026 – 10. 11. 2026');
  });

  it('uporabi ednino pri številu 1', () => {
    expect(plural(1, 'varstvo', 'varstvi', 'varstva', 'varstev')).toBe('varstvo');
  });

  it('uporabi dvojino pri številu 2', () => {
    expect(plural(2, 'varstvo', 'varstvi', 'varstva', 'varstev')).toBe('varstvi');
  });

  it('uporabi množino pri številu 3', () => {
    expect(plural(3, 'varstvo', 'varstvi', 'varstva', 'varstev')).toBe('varstva');
  });

  it('uporabi množino pri številu 4', () => {
    expect(plural(4, 'varstvo', 'varstvi', 'varstva', 'varstev')).toBe('varstva');
  });

  it('uporabi množino pri številu 5', () => {
    expect(plural(5, 'varstvo', 'varstvi', 'varstva', 'varstev')).toBe('varstev');
  });

  it('novega varuha označi kot še neocenjenega', () => {
    expect(trustLabel(null)).toBe('Nov varuh – še brez ocen');
  });

  it('prikaže povprečno oceno z decimalno vejico', () => {
    expect(trustLabel({ averageRating: 4.5, completedSittings: 2 }))
      .toBe('★ 4,5 · 2 opravljeni varstvi');
  });
});