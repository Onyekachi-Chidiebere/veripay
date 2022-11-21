# Assign asset;

-> input:
nin: 'driver's nin',
asset_code:'asset code of the vehicle to be assigned;


-> logic;

- find driver with nin from informal_sector_de=river table;

if driver is not found;
- find driver in nin_sump with nin;

if driver is found in nin dump;
- create driver in informal_sector_driver table;

if driver is not found in nin dump;
- find driver with the provided nin api and update the driver data in the informal_sector_driver and nin_dump table 

if driver is not found return error;

- find asset with asset_code from informal_sector_net table;

- ensure asset is not currently assigned to another driver at the moment;

- ensure driver is not currently assigned to another asset at the moment;

- create a 4 digtit otp;

- create an asset assign in informal_assign_driver with the asset_code, driver's nin and generated otp;

- send a message to driver with the asset code and otp for him to accept the asset;

return success;

# Accept asset;

-> input;
nin:'driver's nin';
asset_code:'asset_code received via sms';
otp:'otp receive by driver via sms';

-> logic;

- find the assing request with asset_code, nin and status:0, from informal_assign_driver table;

- ensure another driver has not accepted the same asset;

- ensure the provided otp is correct;

- update informal_assign_driver's status to 1;

- accept asset by updating informal_sector_driver aseet_code to the provided asste_code;

return success;




