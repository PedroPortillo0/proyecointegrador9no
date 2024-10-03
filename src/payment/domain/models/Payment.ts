export class Payment {
    constructor(
        public id: string,
        public amount: number,
        public currency: string,
        public status: string,
        public userId: string,
    ) {}
}
