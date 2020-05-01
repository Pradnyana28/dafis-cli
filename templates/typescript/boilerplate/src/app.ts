/**
 * App Server
 * 
 * @author I Kadek Pradnyana
 * @link github.com/Pradnyana28
 */

import 'module-alias/register';

import server from './bootstrap/server';
import starter from './bootstrap/start';

/**
 * start server
 * 
 * All configs is setted up and ready to run the server
 */

starter(server);