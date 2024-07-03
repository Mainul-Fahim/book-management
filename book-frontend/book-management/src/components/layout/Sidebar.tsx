import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/dashboard.routes';

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
  };

const Sidebar = () => {

    let sidebarItems;
    const user = {
        role: 'admin'
    }

    switch (user!.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        default:
            break;
    }

    return (
        <Sider breakpoint="lg" collapsedWidth="0">
            <div
                style={{
                    color: 'white',
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>Book Management</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={sidebarItems}
            />
        </Sider>
    );
};

export default Sidebar;