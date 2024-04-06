// goals.test.js

import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import GoalsDisplay from './components/goalsDisplay';
import { calculateBMI, calculateExerciseDays , calculateDailyNeeds} from './utils';

const mockData = {
  data: {
    goals: {
      currentWeight: 70,
      currentLength: 170,
      goalWeight: 65,
      muscleGain: 5,
      exerciseDays: 5,
      protein: 50,
      calories: 2000
    }
  }
};

const mockBMI = 24.22;
const mockExerciseDays = 5;

jest.mock('axios');
jest.mock('./components/map', () => () => <div>MockMap</div>);
describe('GoalsDisplay', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockData);
    render(<GoalsDisplay />);
  });
  describe('fetching and rendering data', () => {
    test('fetches goals data and renders it correctly in the component', async () => {
      await waitFor(() => {
        expect(screen.getByText('Current Weight:')).toBeInTheDocument();
        expect(screen.getByText('Goal Weight:')).toBeInTheDocument();
        expect(screen.getByText('Training Days in a Week:')).toBeInTheDocument();
        expect(screen.getByText('Height:')).toBeInTheDocument();
        expect(screen.getByText('Muscle Gain:')).toBeInTheDocument();
        expect(screen.getByText('Body Mass Index - BMI:')).toBeInTheDocument();
      });
    });
  });
  describe('calculations', () => {
    test('calculates the BMI', async () => {
      await waitFor(() => {
        const bmi = calculateBMI(mockData.data.goals.currentWeight, mockData.data.goals.currentLength);
        expect(bmi === mockBMI);
      });
    });

    test('calculates the correct number of exercise days', async () => {
      await waitFor(() => {
        const exerciseDays = calculateExerciseDays(mockData.data.goals.currentWeight, mockData.data.goals.currentLength);
        expect(exerciseDays === mockExerciseDays)
      });
    });
    test('calculates the correct amount of calories', async () => {
       await waitFor(() => {
         const calories = calculateDailyNeeds(mockData.data.goals.currentWeight, mockData.data.goals.currentLength, 15, "male", "sedentary");
         expect(calories === 2108.1924)
      });
    });

  });
});