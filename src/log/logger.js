import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;


let date = new Date().toISOString().split('T')[0];

// Define o formato customizado dos logs
const customFormat = printf(({ level, message, timestamp }) => {

    const formattedMessage =
        typeof message === 'object' ? JSON.stringify(message, null, 2) : message;

    return `${timestamp} [${level}]: ${formattedMessage}`;

});

const logger = createLogger({
    level: 'info', // Nível padrão do log (debug, info, warn, error)
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        customFormat
    ),
    transports: [
        new transports.Console(), // Logs no console
        new transports.File({ filename: `logs/app[${date}].log` }) // Logs em arquivo
    ],
});

export default logger;
