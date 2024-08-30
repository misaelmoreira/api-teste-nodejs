import * as measureDal from '../../db/dal/measure'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Measure from '../../db/models/measure';
import axios from "axios"

export const checkReading = async (id: any): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    try {
        return await measureDal.getAllMeasuresByIdCustomer(id)
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return { erro: true, message: e.message }
    }
}

export const checkReadingByType = async (payload: any): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    try {
        return await measureDal.getAllMeasuresByIdCustomerByType(payload)
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return { erro: true, message: e.message }
    }
}

export const findMeasureById = async (id: any): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    try {
        return await measureDal.getById(id)
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return null
    }
}

export const sendImageToGemini = async (imageBase64: string, type: string): Promise<any> => {
    try {
        // Initialize GoogleGenerativeAI with your API_KEY.
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

        const model = genAI.getGenerativeModel({
            // Choose a Gemini model.
            model: "gemini-1.5-flash",
        });


        // Generate content using text and the URI reference for the uploaded file.
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: type,
                    data: imageBase64
                }
            },
            { text: "Return only the meter value to me" },
        ]);

        return result.response.text()
    }
    catch (error) {
        console.log("Erro: ", error)
        return 0
    }
}

export const uploadImage = async (imageBase64: string, type: string): Promise<any> => {
    try {
        // url
        const baseUrl = 'https://generativelanguage.googleapis.com'

        // Determine the MIME type and file size
        // Decode the Base64 string
        const buffer = Buffer.from(imageBase64, 'base64');

        // Determine the MIME type (assume JPEG as default or infer from the Base64 string)
        const mimeType = type;
        const numBytes = buffer.length;

        // Initial resumable request defining metadata
        const metadataResponse = await axios.post(`${baseUrl}/upload/v1beta/files?key=${process.env.GEMINI_API_KEY}`, {
            file: {
                display_name: 'teste'
            }
        }, {
            headers: {
                'X-Goog-Upload-Protocol': 'resumable',
                'X-Goog-Upload-Command': 'start',
                'X-Goog-Upload-Header-Content-Length': numBytes,
                'X-Goog-Upload-Header-Content-Type': mimeType,
                'Content-Type': 'application/json'
            }
        });

        // Extract the upload URL from the response headers
        const uploadUrl = metadataResponse.headers['x-goog-upload-url'];

        if (!uploadUrl) {
            throw new Error('Upload URL not found in response headers');
        }

        const uploadResponse = await axios({
            method: 'post',
            url: uploadUrl,
            headers: {
                'Content-Length': numBytes,
                'X-Goog-Upload-Offset': 0,
                'X-Goog-Upload-Command': 'upload, finalize'
            },
            data: buffer
        });

        // Extract file URI from the response
        return uploadResponse.data.file.uri;
    }
    catch (error: any) {
        console.log("Erro: ", error.message)
        throw error;
    }
}

export const save = async (measure: any): Promise<any> => {
    try {
        const measureDb = await measureDal.create(measure)
        return measureDb
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return { erro: true, message: e.message }
    }
}

export const update = async (payload: Measure, value: number): Promise<any> => {
    try {
        return await measureDal.update(payload, value)
    }
    catch (e: any) {
        console.log("Erro: ", e.message)
        return null
    }
}