const isBase64 = (str: string): boolean => {
    // Verifica se a string possui um cabeçalho de tipo de imagem base64 válido
    const regex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;

    if (!regex.test(str)) {
        return false;
    }

    // Remove o cabeçalho da string base64
    const base64Data = str.replace(regex, "");

    try {
        // Verifica se a string restante é válida em Base64
        const buffer = Buffer.from(base64Data, 'base64');
        return buffer.toString('base64') === base64Data;
    } catch (error) {
        return false;
    }
}

export default isBase64