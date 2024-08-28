import Measure from '../models/measure'

export const getAll = async (): Promise<Measure[]> => {
    const measures: Measure[] = [
        {
            measure_uuid: "123e4567-e89b-12d3-a456-426614174000",
            measure_datetime: new Date("2024-08-01T10:00:00Z"),
            measure_type: "WATER",
            has_confirmed: true,
            image_url: "https://example.com/images/measure1.jpg",
            createdAt: new Date("2024-08-01T12:00:00Z"),
            updatedAt: new Date("2024-08-01T12:30:00Z"),
        },
        {
            measure_uuid: "123e4567-e89b-12d3-a456-426614174001",
            measure_datetime: new Date("2024-09-02T11:00:00Z"),
            measure_type: "GAS",
            has_confirmed: false,
            image_url: "https://example.com/images/measure2.jpg",
            createdAt: new Date("2024-09-02T13:00:00Z"),
            updatedAt: new Date("2024-09-02T13:30:00Z"),
        },
        {
            measure_uuid: "123e4567-e89b-12d3-a456-426614174002",
            measure_datetime: new Date("2024-10-03T12:00:00Z"),
            measure_type: "WATER",
            has_confirmed: true,
            image_url: "https://example.com/images/measure3.jpg",
            createdAt: new Date("2024-10-03T14:00:00Z"),
            updatedAt: new Date("2024-10-03T14:30:00Z"),
        }
    ]

    return measures;
}