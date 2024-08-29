import * as measureDal from '../../db/dal/measure'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Measure from '../../db/models/measure';

export const checkReading = async (id: any): Promise<any> => {
    // Verificar se já existe uma leitura no mês naquele tipo de leitura pelo customer code.
    try {
        return await measureDal.getAllByIdCustomer(id) 
    } 
    catch (error) {
        console.log("Erro: ", e.message) 
        return { erro: true, message: e.message }        
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
    
        let value = result.response.text().match(/\d+/)

        if (value) {
            let measuredValue = parseInt(value[0])

            return measuredValue
        }
        else 
        {
            return 0
        }
    } 
    catch (error) {
        console.log("Erro: ", error)   
        return 0    
    }
}

export const save = async (measure: Measure): Promise<any> => {    
    try {          
        const measureDb = await measureDal.create(measure)
        return measureDb        
    } 
    catch (e) {
        console.log("Erro: ", e.message) 
        return { erro: true, message: e.message }
    }
}