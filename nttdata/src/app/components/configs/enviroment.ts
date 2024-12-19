declare type Environment = 'development' | 'testing' | 'preproduction' | 'production';
export  declare type ServiceName = 'middleware';

// ========================================================================================================
const environment: Environment = 'testing';
// ========================================================================================================

const configs = {
    development: {
        middleware:         { host: 'localhost', port: 5000, ssl: false }
    },
    testing: {  
        middleware:         { host: 'localhost', port: 3002, ssl: false }
    },
    preproduction: {
        middleware:         { host: 'localhost', port: 5000, ssl: false }
    },
    production: {
        middleware:         { host: 'localhost', port: 5000, ssl: false }   
    }
};

export function getURL(serviceName: ServiceName): string {
  let serviceInfo = configs[environment][serviceName];
  return `${serviceInfo.ssl ? 'https://' : 'http://'}${serviceInfo.host}:${serviceInfo.port}`;
}

