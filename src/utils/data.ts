import { ISound } from '@/interfaces/sound'

export const getSound = (sound: ISound) => sound ? process.env.VUE_APP_API_URL + sound : ''
