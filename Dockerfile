# Start from Ubuntu base
FROM ubuntu:22.04

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install basic tools
RUN apt-get update && apt-get install -y \
    sudo \
    curl \
    wget \
    git \
    vim \
    nano \
    build-essential \
    python3 \
    python3-pip \
    nodejs \
    npm \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Create web folder structure
# RUN mkdir -p /var/www/website.com/frontends /var/www/website.com/backends

# Set working directory
WORKDIR /var/www/website.com

# Copy project files (respects .dockerignore)
COPY ./ /var/www/website.com/

# Set ownership to www-data (default Nginx user) for web folders
RUN chown -R www-data:www-data /var/www/website.com \
    && chmod -R 755 /var/www/website.com

# Expose ports
EXPOSE 80 5173 3000 4001 5000

# Default command
CMD ["bash"]
