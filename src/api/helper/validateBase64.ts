const validateBase64 = (str: string): boolean => {
    const base64Pattern = /^(?:[A-Za-z0-9+/]{4}){1,}[A-Za-z0-9+/]{0,2}(?:==|=)?$/;

    if (!base64Pattern.test(str) || (str.length % 4 !== 0 && !str.endsWith('==') && !str.endsWith('='))) {
        return false;
    }

    try {
        // Tentativa de decodificar a string Base64
        const decoded = Buffer.from(str, 'base64').toString('utf8');
        
        // Verifica se a decodificação resulta em uma string válida
        return decoded !== null;
    } catch (e) {
        // Se a decodificação falhar, retorna false
        return false;
    }
}

export default validateBase64