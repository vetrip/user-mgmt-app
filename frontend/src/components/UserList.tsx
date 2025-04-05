import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { UserDTO, UserRole, UserStatus } from '../types/user';
import { getAllUsers, deleteUser, updateUserStatus, updateUserRole } from '../services/api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      await fetchUsers();
      setError(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const handleStatusChange = async (id: number, status: UserStatus) => {
    try {
      await updateUserStatus(id, status);
      await fetchUsers();
      setError(null);
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status');
    }
  };

  const handleRoleChange = async (id: number, role: UserRole) => {
    try {
      await updateUserRole(id, role);
      await fetchUsers();
      setError(null);
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: UserDTO) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/users/new')}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/dashboard/users/${user.id}`)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, user)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedUser?.id === user.id)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => {
                      handleStatusChange(user.id!, UserStatus.ACTIVE);
                      handleMenuClose();
                    }}>
                      Set Active
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleStatusChange(user.id!, UserStatus.INACTIVE);
                      handleMenuClose();
                    }}>
                      Set Inactive
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleStatusChange(user.id!, UserStatus.SUSPENDED);
                      handleMenuClose();
                    }}>
                      Set Suspended
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleRoleChange(user.id!, UserRole.ADMIN);
                      handleMenuClose();
                    }}>
                      Make Admin
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleRoleChange(user.id!, UserRole.USER);
                      handleMenuClose();
                    }}>
                      Make User
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleDelete(user.id!);
                      handleMenuClose();
                    }}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList; 