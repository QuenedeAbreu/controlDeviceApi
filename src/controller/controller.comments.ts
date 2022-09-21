import { Response, Request } from 'express';
// import { IComputer, Computer } from '../models/computers';
import { IComments, Comments } from '../models/commentes'

export const getAllComments = async (req: Request, res: Response) => {
  const computer_id = req.params.computer_id
  try {
    const comments: Array<IComments> = await Comments.findAll({
      where: {
        computer_id
      }
    })
    res.status(200).json({
      comments
    })
  } catch (error) {
    res.json(error)
  }
}