import * as measureDal from '../../db/dal/measure'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import Measure from '../../db/models/measure';

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
        // todo: Initialize GoogleAIFileManager with your API_KEY.
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY || '');

        // Upload the file and specify a display name.
        const uploadResponse = await fileManager.uploadFile(imageBase64, {
            mimeType: type,
            displayName: '',
        });

        // View the response.
        console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`)
    }
    catch (error) {
        console.log("Erro: ", error)   
        return 0    
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