interface Medida {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
  
  class Measure implements Medida {
    measure_uuid: string;
    measure_datetime: Date;
    measure_type: string;
    has_confirmed: boolean;
    image_url: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  
    constructor(data: Medida) {
      this.measure_uuid = data.measure_uuid;
      this.measure_datetime = data.measure_datetime;
      this.measure_type = data.measure_type;
      this.has_confirmed = data.has_confirmed;
      this.image_url = data.image_url;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.deletedAt = data.deletedAt;
    }
  
    // Métodos adicionais podem ser adicionados aqui
  }
  
  export default Measure