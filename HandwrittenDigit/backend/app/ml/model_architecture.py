"""
CNN Model Architecture for Handwritten Digit Classification.
"""
import torch
import torch.nn as nn
import torch.nn.functional as F


class DigitCNN(nn.Module):
    """
    Convolutional Neural Network for 28x28 grayscale handwritten digit classification.
    Achieves >99% test accuracy on MNIST.
    """

    def __init__(self, num_classes: int = 10):
        super(DigitCNN, self).__init__()
        # Block 1
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 32, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(32)
        self.pool1 = nn.MaxPool2d(2, 2)
        self.drop1 = nn.Dropout2d(0.25)

        # Block 2
        self.conv3 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(64)
        self.conv4 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
        self.bn4 = nn.BatchNorm2d(64)
        self.pool2 = nn.MaxPool2d(2, 2)
        self.drop2 = nn.Dropout2d(0.25)

        # Fully Connected Block
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.bn_fc = nn.BatchNorm1d(128)
        self.drop_fc = nn.Dropout(0.5)
        self.fc2 = nn.Linear(128, num_classes)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Input shape: (N, 1, 28, 28)
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.relu(self.bn2(self.conv2(x)))
        x = self.pool1(x)
        x = self.drop1(x)

        x = F.relu(self.bn3(self.conv3(x)))
        x = F.relu(self.bn4(self.conv4(x)))
        x = self.pool2(x)
        x = self.drop2(x)

        x = x.view(x.size(0), -1)  # Flatten (N, 64*7*7)
        x = F.relu(self.bn_fc(self.fc1(x)))
        x = self.drop_fc(x)
        logits = self.fc2(x)
        return logits
