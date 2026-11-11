"""
Training script for Handwritten Digit Classifier using MNIST IDX dataset.
"""
import os
import sys
import torch
import torch.nn as nn
import torch.optim as optim
import time

# Ensure backend root is in sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from training.dataset import get_data_loaders
from app.ml.model_architecture import DigitCNN


def train_model(
    archive_dir: str,
    output_model_path: str,
    epochs: int = 5,
    batch_size: int = 64,
    lr: float = 0.001
):
    """Trains DigitCNN on local archive binary dataset and saves weights."""
    print("=" * 60)
    print(f"Starting model training...")
    print(f"Archive dataset dir: {archive_dir}")
    print(f"Output model path: {output_model_path}")
    print(f"Epochs: {epochs}, Batch size: {batch_size}, Learning rate: {lr}")
    print("=" * 60)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using compute device: {device}")

    train_loader, test_loader = get_data_loaders(archive_dir, batch_size=batch_size)

    model = DigitCNN(num_classes=10).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)

    os.makedirs(os.path.dirname(output_model_path), exist_ok=True)

    start_time = time.time()

    for epoch in range(1, epochs + 1):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * images.size(0)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        epoch_loss = running_loss / total
        epoch_acc = (correct / total) * 100.0

        # Evaluate on test set
        model.eval()
        test_correct = 0
        test_total = 0
        test_loss = 0.0

        with torch.no_grad():
            for images, labels in test_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                test_loss += loss.item() * images.size(0)
                _, predicted = torch.max(outputs.data, 1)
                test_total += labels.size(0)
                test_correct += (predicted == labels).sum().item()

        val_loss = test_loss / test_total
        val_acc = (test_correct / test_total) * 100.0

        print(f"Epoch [{epoch}/{epochs}] - "
              f"Train Loss: {epoch_loss:.4f}, Train Acc: {epoch_acc:.2f}% | "
              f"Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%")

    elapsed = time.time() - start_time
    print(f"\nTraining completed in {elapsed:.2f} seconds.")

    # Save model weights
    torch.save(model.state_dict(), output_model_path)
    print(f"Successfully saved trained model weights to: {output_model_path}")
    print("=" * 60)


if __name__ == "__main__":
    archive_directory = os.path.join(os.path.dirname(BASE_DIR), "archive")
    model_output_path = os.path.join(BASE_DIR, "models", "digit_classifier.pt")
    train_model(archive_directory, model_output_path, epochs=2, batch_size=128)
