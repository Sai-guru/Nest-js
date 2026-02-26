import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {

    // injecting services from other modules - we can only inject services that are exported by the module and we have imported that module in our module
    // hello module must export HelloService
    // user module must import HelloModule
    constructor(private readonly helloService: HelloService) {}

    getAllUsers() {
        return [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
            { id: 3, name: 'Jim Doe' },
        ]
    }

    getUserById(id: number) {
        const user = this.getAllUsers().find(user => user.id === id);
        return user;
    }

    getWelcomeMessage(userId: number): string {
        const user = this.getUserById(userId);
        if (!user) {
            return 'User not found';
        }
        return this.helloService.getHelloWithName(user.name);
    }
}

