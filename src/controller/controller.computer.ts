import { Response, Request } from 'express'
import { IComputer, Computer } from '../models/computers'
import jwt from 'jsonwebtoken'
import { roleComputer, IComputerRole } from '../helpers/statusComputer/roleComputers'

import SearchComputer from '../helpers/SearchComputer';

export const getAllComputers = async (req: Request, res: Response) => {
  const { patrimony } = req.query
  const { pageNumber, pageSize } = req.query as unknown as number as any
  var query = {}
  if (patrimony) {
    query = {
      where: { patrimony_number: patrimony as string }
    }
  } else if (pageNumber && pageSize) {
    query = {
      limit: parseInt(pageSize),
      offset: parseInt(pageNumber) * parseInt(pageSize)
    }
  }
  try {
    const { count, rows } = await Computer.findAndCountAll(query)

    if (rows.length !== 0) {
      res.status(200).json({
        count,
        rows
      })
    } else {
      res.status(404).json({
        count,
        message: 'No computer found',
      })
    }
  } catch (error) {
    res.json(error)
  }
}

// export const getComputerByPatrimony = async (req: Request, res: Response) => {
//   // const { patrimony } = req.params
//   const patrimony = req.query.patrimony
//   try {
//     res.status(200).json({
//       patrimony
//     })
//     // function isNumber(n: any) {
//     //   return !isNaN(parseFloat(n)) && isFinite(n);
//     // }
//     // const computer: IComputer | null = await Computer.findOne({ where: { patrimony_number: patrimony } })
//     // if (computer && isNumber(patrimony)) {
//     //   res.status(200).json({
//     //     computer
//     //   })
//     // } else {
//     //   res.status(404).json({
//     //     message: 'Computer not found'
//     //   })
//     // }
//   } catch (error) {
//     res.json(error)
//   }
// }

export const postCreateComputer = async (req: Request, res: Response) => {
  const { patrimony_number, serial_number, status } = req.body
  const jwtAuthorization: string = req.headers.authorization as string
  const decodedToken = jwt.verify(jwtAuthorization.split(' ')[1], process.env.JWT_SECRET as string)
  const { id } = decodedToken as { id: number }
  const role: IComputerRole = roleComputer(status)
  const consutComputer: IComputer | null = await Computer.findOne({ where: { serial_number: serial_number } })
  // const response: IPositivo = await Positivo('4a611fj4r')
  // const response = await Lenovo('pe01gsqp')

  try {
    if (consutComputer) {
      res.status(400).json({
        message: 'Computer already exists'
      })
    } else {
      if (!patrimony_number || !serial_number) {
        return res.status(400).json({
          message: 'Patrimony and serial number are required'
        })
      } else {
        const response = await SearchComputer(serial_number)
        if (!response.error) {
          const computer: IComputer = await Computer.create({
            brand: response.brand,
            model: response.model,
            serial_number,
            patrimony_number,
            warranty_end: response.warranty_end,
            status: role.roleNumber,
            user_id_register: id
          })
          res.status(200).json({
            message: 'Computer created',
            computer
          })
        } else {
          res.status(400).json({
            message: response.error
          })
        }
      }
    }
  } catch (error) {
    res.json({
      message: `error ao criar o computador`,
      error
    })
  }

}

export const putUpdateStatusComputer = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  const role: IComputerRole = roleComputer(status)
  try {
    const computer: IComputer | null = await Computer.findOne({ where: { id } })
    if (computer) {
      const response = await computer.update({
        status: role.roleNumber
      })
      res.status(200).json({
        message: 'Computer updated',
        response
      })
    } else {
      res.status(404).json({
        message: 'Computer not found'
      })
    }
  } catch (error) {
    res.json({
      message: `error ao atualizar o status do computador`,
      error
    })
  }
}



export const deleteComputer = async (req: Request, res: Response) => {
  const { patrimony } = req.params
  try {
    const computer: IComputer | null = await Computer.findOne({ where: { patrimony_number: patrimony } })
    if (computer) {
      await computer.destroy()
      res.status(200).json({
        message: 'Computer deleted'
      })
    } else {
      res.status(404).json({
        message: 'Computer not found'
      })
    }
  } catch (error) {
    res.json(error)
  }
}