import { Response, Request } from 'express'
import { IComputer, Computer } from '../models/computers'

export const getAllComputers = async (req: Request, res: Response) => {
  try {
    const computers: Array<IComputer> = await Computer.findAll()
    if (computers.length !== 0) {
      res.status(404).json({
        qtdComputers: computers.length,
        message: 'No computer found',
      })
    } else {
      res.status(200).json({
        qtdComputers: computers.length,
        computers
      })
    }
  } catch (error) {
    res.json(error)
  }
}