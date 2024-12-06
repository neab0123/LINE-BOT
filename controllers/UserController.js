const prisma = require('./PrismaClient');

async function CreateUser(dataUser){
    const copyUser = {
        // user_id: 0,
        fullname: dataUser.fullname,
        address: dataUser.address,
        mobile: dataUser.mobile,
        line_id: dataUser.line_id,
        shipped_status: dataUser.shipped_status,
        promp_status: dataUser.promp_status
    }

    const user = await prisma.user.create({
        data: copyUser,
        select: {
            user_id: true
        }
    })

    return user;
}

async function GetUsers(){
    const listUser = await prisma.user.findMany()
    return listUser;
}

async function GetUserByUserId(userId){
    const findUser = await prisma.user.findFirst({
        where: {
            line_id: userId
        }
    })

    return findUser;
}

async function UpdateUser(userId, dataUser) {
    const findUser = await GetUserByUserId(userId);

    if(findUser){
        findUser.fullname = dataUser.fullname? dataUser.fullname: findUser.fullname;
        findUser.address = dataUser.address? dataUser.address: findUser.address;
        findUser.mobile = dataUser.mobile? dataUser.mobile: findUser.mobile;
        findUser.promp_status = dataUser.promp_status? dataUser.promp_status: findUser.promp_status;
        findUser.shipped_status = dataUser.shipped_status? dataUser.shipped_status: findUser.shipped_status;
        findUser.line_id = dataUser.line_id? dataUser.line_id : findUser.line_id;
        const updateUser = await prisma.user.update({
            where: {
                user_id: findUser.user_id
            },
            data: findUser,
            select: {
                user_id: true
            }
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