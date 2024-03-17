export interface AgeStorage {
    dateOfBirth: number,
    desiredAge: number
}

export function setStoredAge(inputData: AgeStorage): Promise<void> {
    console.log("setStoredAge(): " + inputData.dateOfBirth + " " + inputData.desiredAge)
    return new Promise((resolve) => {
        chrome.storage.sync.set({ inputData }, () => {
            resolve()
        })
    })
}

export function getStoredAge(): Promise<AgeStorage> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["inputData"], (res) => {
            resolve(res.inputData ?? null)
            if (res) {
                console.log("getStoredAge(): " + res.inputData?.dateOfBirth + " " + res.inputData?.desiredAge)
            }
        })
    })
}
