import {rest} from "msw";
import { API_URL } from '../app/constants';
import { aleatorio, results } from "./dataMock";

export const handlers = [
    /* rest.get(API_URL, (req, res, ctx) => {
        const dataCharacter = req.url.searchParams.get('character') ? results : dataMock2
        return res{
            ctx.staus(200),
            ctx.json({})
        }
    }) */
    rest.get(API_URL, (req, res, ctx) => {
        const data = req.url.searchParams.get('character') ? results : aleatorio;
        if(data) {
            return res(
                ctx.status(200),
                ctx.json(data)
            )
        }   
    }),
    /* rest.get(`${API_URL}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(results));
      }), */
]