import {test as base} from '@playwright/test';

export const customtest = base.extend({
testDataForOrder : {
    username : "anshika@gmail.com",
    password : "Iamking@000",
    productName:"zara coat 3"
    }
});
