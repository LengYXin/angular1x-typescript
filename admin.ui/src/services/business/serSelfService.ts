
import { serHelper } from '../../service';
import * as GlobalConfig from '../../config';

export default class {
    static $inject = ['serHelper'];
    constructor(
        private serHelper: serHelper,
    ) {

    }
}