// requests.test.js

import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import Requests from './reuests';

const mockUser = {
  firstName: "John",
  email: "john@example.com"
};

jest.mock('axios');
jest.mock('../map', () => () => <div>MockMap</div>);

describe('Requests', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({ data: mockUser });
    await act(async () => {
      render(<Requests />);
    });
  });

  describe('fetching and rendering data', () => {
    test('test first name and email', async () => {
      await act(async () => {
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: mockUser.firstName } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: mockUser.email } });

        expect(screen.getByLabelText('First Name:').value).toBe(mockUser.firstName);
        expect(screen.getByLabelText('Email').value).toBe(mockUser.email);
      });
    });
  });
});
