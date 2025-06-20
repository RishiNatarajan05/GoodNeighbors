import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Avatar, 
  List, 
  Divider,
  Chip,
  Badge,
  IconButton
} from '@mui/material';
import { 
  Send as SendIcon, 
  Person as PersonIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  organization: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const Messages: React.FC = () => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy contacts with realistic conversation data
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 'dr-coordination',
      name: 'Dr. Sarah Johnson',
      organization: 'City Medical Corps',
      avatar: 'SJ',
      status: 'online',
      lastMessage: "Perfect! I'll see you at the marathon checkpoint.",
      lastMessageTime: '2 min ago',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Hi! I'm coordinating the medical volunteers for the marathon this weekend. Are you still available for the 8 AM shift?",
          sender: 'contact',
          timestamp: '2024-07-08 10:30 AM',
          isRead: true
        },
        {
          id: 2,
          text: "Yes, absolutely! I'll be there at 7:45 AM to get set up. Should I bring my own first aid kit?",
          sender: 'user',
          timestamp: '2024-07-08 10:32 AM',
          isRead: true
        },
        {
          id: 3,
          text: "We'll provide all the medical supplies, but feel free to bring your personal kit as backup. You'll be stationed at checkpoint 3 near mile 8.",
          sender: 'contact',
          timestamp: '2024-07-08 10:35 AM',
          isRead: true
        },
        {
          id: 4,
          text: "Perfect! I'll see you at the marathon checkpoint.",
          sender: 'contact',
          timestamp: '2024-07-08 10:40 AM',
          isRead: true
        }
      ]
    },
    {
      id: 'search-rescue',
      name: 'Captain Mike Rodriguez',
      organization: 'State Disaster Response',
      avatar: 'MR',
      status: 'away',
      lastMessage: 'The training exercise is confirmed for next Friday.',
      lastMessageTime: '1 hour ago',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          text: "Captain Rodriguez here. We're planning a search and rescue drill next week. Are you interested in participating?",
          sender: 'contact',
          timestamp: '2024-07-07 2:15 PM',
          isRead: true
        },
        {
          id: 2,
          text: "Absolutely! I'd love to participate. What's the schedule and what should I bring?",
          sender: 'user',
          timestamp: '2024-07-07 2:20 PM',
          isRead: true
        },
        {
          id: 3,
          text: "It's a full-day exercise on Friday, 7 AM to 6 PM. We'll provide safety equipment. Just bring comfortable clothes and sturdy boots.",
          sender: 'contact',
          timestamp: '2024-07-07 2:25 PM',
          isRead: true
        },
        {
          id: 4,
          text: "Perfect! I'll be there. Should I arrive at the main command center?",
          sender: 'user',
          timestamp: '2024-07-07 2:30 PM',
          isRead: true
        },
        {
          id: 5,
          text: "Yes, report to the main command center at 6:45 AM for briefing. The training exercise is confirmed for next Friday.",
          sender: 'contact',
          timestamp: '2024-07-08 9:30 AM',
          isRead: false
        },
        {
          id: 6,
          text: "Great! Looking forward to it. Will there be other volunteers there too?",
          sender: 'contact',
          timestamp: '2024-07-08 9:35 AM',
          isRead: false
        }
      ]
    },
    {
      id: 'cpr-training',
      name: 'Lisa Chen',
      organization: 'Community Health Org',
      avatar: 'LC',
      status: 'online',
      lastMessage: 'We have 5 slots available for the CPR training.',
      lastMessageTime: '30 min ago',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Hi! I'm Lisa from Community Health. We're hosting a CPR awareness event this weekend and need instructors. Are you certified?",
          sender: 'contact',
          timestamp: '2024-07-08 11:00 AM',
          isRead: true
        },
        {
          id: 2,
          text: "Yes, I have my CPR instructor certification. What's the event details?",
          sender: 'user',
          timestamp: '2024-07-08 11:05 AM',
          isRead: true
        },
        {
          id: 3,
          text: "It's a community fair on Saturday from 10 AM to 3 PM. We'll have multiple stations teaching hands-only CPR to the public.",
          sender: 'contact',
          timestamp: '2024-07-08 11:10 AM',
          isRead: true
        },
        {
          id: 4,
          text: "That sounds great! How many people are you expecting?",
          sender: 'user',
          timestamp: '2024-07-08 11:15 AM',
          isRead: true
        },
        {
          id: 5,
          text: "We're expecting 200-300 people throughout the day. We have 5 slots available for the CPR training.",
          sender: 'contact',
          timestamp: '2024-07-08 11:45 AM',
          isRead: true
        }
      ]
    },
    {
      id: 'shelter-support',
      name: 'David Thompson',
      organization: 'Red Cross Bay Area',
      avatar: 'DT',
      status: 'offline',
      lastMessage: 'Thank you for your help today. The families are settled in.',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "David from Red Cross here. We're setting up emergency shelters due to the flooding. Can you help with logistics?",
          sender: 'contact',
          timestamp: '2024-07-08 8:00 AM',
          isRead: true
        },
        {
          id: 2,
          text: "Of course! What do you need help with?",
          sender: 'user',
          timestamp: '2024-07-08 8:05 AM',
          isRead: true
        },
        {
          id: 3,
          text: "We need help setting up cots, organizing supplies, and registering displaced families. Can you come to the community center?",
          sender: 'contact',
          timestamp: '2024-07-08 8:10 AM',
          isRead: true
        },
        {
          id: 4,
          text: "I'll be there in 30 minutes. Should I bring anything?",
          sender: 'user',
          timestamp: '2024-07-08 8:15 AM',
          isRead: true
        },
        {
          id: 5,
          text: "Just yourself and comfortable clothes. We have everything else. Thank you for your help today. The families are settled in.",
          sender: 'contact',
          timestamp: '2024-07-08 5:00 PM',
          isRead: true
        }
      ]
    },
    {
      id: 'communications',
      name: 'Robert Wilson',
      organization: 'Amateur Radio Emergency Service',
      avatar: 'RW',
      status: 'online',
      lastMessage: 'The training will cover basic radio protocols and emergency procedures.',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: "Hi! I'm Robert from ARES. We're hosting an emergency communications training next week. Are you interested?",
          sender: 'contact',
          timestamp: '2024-07-07 3:00 PM',
          isRead: true
        },
        {
          id: 2,
          text: "Yes, that sounds interesting! What's involved in the training?",
          sender: 'user',
          timestamp: '2024-07-07 3:05 PM',
          isRead: true
        },
        {
          id: 3,
          text: "The training will cover basic radio protocols and emergency procedures.",
          sender: 'contact',
          timestamp: '2024-07-07 3:10 PM',
          isRead: true
        }
      ]
    }
  ]);

  // Check for new conversation from My Opportunities
  React.useEffect(() => {
    const newConversationData = localStorage.getItem('newConversation');
    if (newConversationData) {
      try {
        const newContact: Contact = JSON.parse(newConversationData);
        
        // Add the new contact to the list
        setContacts(prev => {
          // Check if contact already exists
          const existingContact = prev.find(c => c.id === newContact.id);
          if (existingContact) {
            return prev;
          }
          return [newContact, ...prev];
        });
        
        // Select the new contact
        setSelectedContact(newContact.id);
        
        // Clear the localStorage
        localStorage.removeItem('newConversation');
        
        // Don't automatically send a response - wait for user to send first message
      } catch (error) {
        console.error('Error parsing new conversation data:', error);
        localStorage.removeItem('newConversation');
      }
    }
  }, []);

  const selectedContactData = contacts.find(contact => contact.id === selectedContact);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const userMessage: Message = {
        id: selectedContactData!.messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleString(),
        isRead: true
      };

      // Update the selected contact's messages
      setContacts(prev => prev.map(contact => 
        contact.id === selectedContact 
          ? {
              ...contact,
              messages: [...contact.messages, userMessage],
              lastMessage: newMessage,
              lastMessageTime: 'Just now'
            }
          : contact
      ));

      setNewMessage('');
      
      // Check if this is the first message in the conversation
      const isFirstMessage = selectedContactData!.messages.length === 0;
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate typing delay and response
      setTimeout(() => {
        setIsTyping(false);
        
        let responseText: string;
        
        if (isFirstMessage) {
          // Standard response for first contact
          responseText = "Thanks for reaching out! I'll be happy to send you more information about this opportunity. Let me gather the details and get back to you within the next few hours.";
        } else {
          // Random responses for subsequent messages
          const responses = [
            "Thanks for the update! I'll make a note of that.",
            "Perfect! That works for us.",
            "Great to hear from you. We'll coordinate the details.",
            "Appreciate your quick response. Let's touch base soon.",
            "Excellent! I'll update the schedule accordingly."
          ];
          responseText = responses[Math.floor(Math.random() * responses.length)];
        }
        
        const contactResponse: Message = {
          id: selectedContactData!.messages.length + 2,
          text: responseText,
          sender: 'contact',
          timestamp: new Date().toLocaleString(),
          isRead: false
        };

        setContacts(prev => prev.map(contact => 
          contact.id === selectedContact 
            ? {
                ...contact,
                messages: [...contact.messages, contactResponse],
                lastMessage: responseText,
                lastMessageTime: 'Just now',
                unreadCount: 0
              }
            : contact
        ));
      }, 3000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#4caf50';
      case 'away': return '#ff9800';
      case 'offline': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {t('messages.title')}
      </Typography>
      
      <Paper elevation={3} sx={{ height: '700px', display: 'flex' }}>
        {/* Sidebar - Contact List */}
        <Box sx={{ width: 350, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
          {/* Search */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Box>

          {/* Contact List */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <List sx={{ p: 0 }}>
              {filteredContacts.map((contact) => (
                <Box
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact.id);
                    // Mark messages as read when selecting contact
                    setContacts(prev => prev.map(c => 
                      c.id === contact.id ? { ...c, unreadCount: 0 } : c
                    ));
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    cursor: 'pointer',
                    backgroundColor: selectedContact === contact.id ? 'primary.light' : 'transparent',
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(contact.status),
                            border: 2,
                            borderColor: 'white'
                          }}
                        />
                      }
                    >
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {contact.avatar}
                      </Avatar>
                    </Badge>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" noWrap>
                        {contact.name}
                      </Typography>
                      {contact.unreadCount > 0 && (
                        <Chip
                          label={contact.unreadCount}
                          size="small"
                          color="primary"
                          sx={{ minWidth: 20, height: 20, fontSize: '0.75rem' }}
                        />
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary" noWrap display="block">
                      {contact.organization}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ color: 'text.primary', mb: 0.5 }}>
                      {contact.lastMessage}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {contact.lastMessageTime}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </List>
          </Box>
        </Box>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(selectedContactData!.status),
                            border: 2,
                            borderColor: 'white'
                          }}
                        />
                      }
                    >
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {selectedContactData!.avatar}
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography variant="h6" color="text.primary">
                        {selectedContactData!.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedContactData!.organization} • {selectedContactData!.status}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                <List sx={{ p: 0 }}>
                  {selectedContactData!.messages.map((message, index) => (
                    <React.Fragment key={message.id}>
                      <Box sx={{ 
                        flexDirection: 'column', 
                        alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        px: 0
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-end',
                          gap: 1,
                          maxWidth: '70%',
                          flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                        }}>
                          {message.sender === 'contact' && (
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                              {selectedContactData!.avatar}
                            </Avatar>
                          )}
                          <Box>
                            <Paper
                              elevation={1}
                              sx={{
                                p: 2,
                                backgroundColor: message.sender === 'user' ? '#1976d2' : '#f5f5f5',
                                color: message.sender === 'user' ? 'white' : 'text.primary',
                                borderRadius: 2,
                                maxWidth: '100%'
                              }}
                            >
                              <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                                {message.text}
                              </Typography>
                            </Paper>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 1, 
                              mt: 0.5,
                              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}>
                              <Typography variant="caption" color="textSecondary">
                                {message.timestamp}
                              </Typography>
                              {message.sender === 'user' && (
                                <Chip 
                                  label={message.isRead ? "Read" : "Delivered"} 
                                  size="small" 
                                  variant="outlined"
                                  color={message.isRead ? "success" : "default"}
                                />
                              )}
                            </Box>
                          </Box>
                          {message.sender === 'user' && (
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                              <PersonIcon />
                            </Avatar>
                          )}
                        </Box>
                      </Box>
                      {index < selectedContactData!.messages.length - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <Box sx={{ 
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      px: 0
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-end',
                        gap: 1,
                        maxWidth: '70%'
                      }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                          {selectedContactData!.avatar}
                        </Avatar>
                        <Box>
                          <Paper
                            elevation={1}
                            sx={{
                              p: 2,
                              backgroundColor: '#f5f5f5',
                              borderRadius: 2,
                              maxWidth: '100%'
                            }}
                          >
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: '#999',
                                  animation: 'typing 1.4s infinite ease-in-out',
                                  '&:nth-of-type(1)': { animationDelay: '0s' },
                                  '&:nth-of-type(2)': { animationDelay: '0.2s' },
                                  '&:nth-of-type(3)': { animationDelay: '0.4s' },
                                  '@keyframes typing': {
                                    '0%, 60%, 100%': {
                                      transform: 'translateY(0)',
                                      opacity: 0.4
                                    },
                                    '30%': {
                                      transform: 'translateY(-10px)',
                                      opacity: 1
                                    }
                                  }
                                }}
                              />
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: '#999',
                                  animation: 'typing 1.4s infinite ease-in-out',
                                  animationDelay: '0.2s'
                                }}
                              />
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: '#999',
                                  animation: 'typing 1.4s infinite ease-in-out',
                                  animationDelay: '0.4s'
                                }}
                              />
                            </Box>
                          </Paper>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </List>
              </Box>

              {/* Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    <SendIcon />
                  </Button>
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Press Enter to send, Shift+Enter for new line
                </Typography>
              </Box>
            </>
          ) : (
            /* Welcome Screen */
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              p: 4
            }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Select a contact to start messaging
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Choose from the list of organizations and volunteers to coordinate your disaster relief efforts.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Messages; 