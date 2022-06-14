import { IHotel } from '../types';

export const getAllHotels = async () => {
  const response = await fetch('http://localhost:3000/api/getHotels');
  const data = await response.json();
  return data.hotels;
};

export const getHotelById = async (id: string | string[] | undefined) => {
  const hotels: IHotel[] = await getAllHotels();
  return hotels?.find(hotel => hotel.id === id);
};

export const getAllUsers = async () => {
  const response = await fetch('http://localhost:3000/api/getUsers');
  const data = await response.json();
  return data.users;
};
