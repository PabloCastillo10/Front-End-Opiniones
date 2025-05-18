import {useState} from 'react'
import { getCursos } from '../../services/api'

export const useCursos = () => {
    const [cursos, setCursos] = useState([])

    const handleGetCursos = async () => {
        try {
            const response = await getCursos();
            console.log(response)
            setCursos(response);

        } catch (error) {
            console.error("Error al obtener cursos : ", error)
        }
    }

    return {cursos, handleGetCursos}
}

