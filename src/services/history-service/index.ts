import { CreateHistoryParams } from '@/protocols';
import historyRepository from '@/repositories/history-repository';
import { TypeInfo } from '@prisma/client';

export async function getAllHistory(userId: number) {
    const history = await historyRepository.getAllHistory(userId);

    return history;
}

export async function deleteAllHistory(userId: number) {
    await historyRepository.deleteAllHistory(userId);
}

async function addHistory(userId: number, index: string, name: string, type: TypeInfo) {
    const checkHistoryExist = await historyRepository.getHistory(index);
    if(checkHistoryExist){
        await historyRepository.deleteHistory(checkHistoryExist.id);
    }

    const historyData: CreateHistoryParams = {
        userId,
        index,
        type,
        name
    };

    const createdNewHistory = await historyRepository.addHistory(historyData);
  
    return createdNewHistory;
}

const historyService = { 
    getAllHistory,
    deleteAllHistory,
    addHistory
};

export default historyService;
