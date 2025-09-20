import { User } from '@/modules/users/entities/user.entity';

describe('User Entity', () => {
  it('should create a User instance', () => {
    const user = new User();

    expect(user).toBeInstanceOf(User);
  });
});
