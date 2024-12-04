const user = require('./PrismaClient').user;

async function CreateUser(dataUser){
    let copyUser = {
        user_id: 0,
        fullname: dataUser.fullname,
        address: dataUser.address,
        mobile: dataUser.mobile,
        line_id: dataUser.line_id,
        shipped_status: 0,
        promp_status: 0
    }
    let user = await user.create({
        data: copyUser
    })

    return user;
}

async function GetUsers(){
    const listUser = user.findMany()
    return listUser;
}

async function GetUserByUserId(userId){
    let findUser = user.findFirst({
        where: {
            line_id: userId
        }
    })

    return findUser;
}

async function UpdateUser(userId, dataUser) {
    let findUser = await GetUserByUserId(userId);

    if(findUser){
        findUser.fullname = dataUser.fullname;
        findUser.address = dataUser.address;
        findUser.mobile = dataUser.mobile;
        findUser.promp_status = dataUser.promp_status;
        findUser.shipped_status = dataUser.shipped_status;
        findUser.line_id = dataUser.line_id;
        let updateUser = await user.update({
            where: {
                user_id: findUser.user_id
            },
            data: findUser
        })
        return updateUser;
    }else{
        return null;
    }
    
}

module.exports = {
    GetUsers,
    CreateUser,
    GetUserByUserId,
    UpdateUser
}