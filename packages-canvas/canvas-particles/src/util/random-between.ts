import {
  TRange
} from '../types';

export default function randomBetween([n1, n2]: TRange): number {
  return n1 !== n2 ? n1 + Math.random() * (n2 - n1) : n1;
}